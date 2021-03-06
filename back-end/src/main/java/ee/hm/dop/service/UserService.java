package ee.hm.dop.service;

import static java.lang.String.format;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.ws.rs.BadRequestException;

import ee.hm.dop.dao.UserDAO;
import ee.hm.dop.model.Role;
import ee.hm.dop.model.User;
import ee.hm.dop.model.taxon.Taxon;
import org.apache.commons.lang3.text.WordUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserService extends BaseService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Inject
    private UserDAO userDAO;

    @Inject
    private TaxonService taxonService;

    public User getUserByIdCode(String idCode) {
        return userDAO.findUserByIdCode(idCode);
    }

    public User getUserByUsername(String username) {
        return userDAO.findUserByUsername(username);
    }

    public User create(String idCode, String name, String surname) {
        User user = new User();
        user.setIdCode(idCode);
        user.setName(name);
        user.setSurname(surname);

        return create(user);
    }

    public synchronized User create(User user) {
        user.setName(WordUtils.capitalizeFully(user.getName(), ' ', '-'));
        user.setSurname(WordUtils.capitalizeFully(user.getSurname(), ' ', '-'));
        String generatedUsername = generateUsername(user.getName(), user.getSurname());
        user.setUsername(generatedUsername);
        user.setRole(Role.USER);

        logger.info(format("Creating user: username = %s; name = %s; surname = %s; idCode = %s", user.getUsername(),
                user.getName(), user.getSurname(), user.getIdCode()));

        return userDAO.update(user);
    }

    public Role getUserRole(String userName) {
        User user = userDAO.findUserByUsername(userName);
        return user.getRole();
    }

    // Only users with role 'USER' can be restricted
    public User restrictUser(User user) {
        user = getUserByUsername(user.getUsername());
        if (user.getRole().equals(Role.USER)) {
            return setUserRole(user, Role.RESTRICTED);
        }

        return null;
    }

    //Only users with role 'RESTRICTED' can be set to role 'USER'
    public User removeRestriction(User user) {
        user = getUserByUsername(user.getUsername());
        if (user.getRole().equals(Role.RESTRICTED)) {
            return setUserRole(user, Role.USER);
        }

        return null;
    }

    public List<User> getModerators(User loggedInUser) {
        if (isUserAdmin(loggedInUser)) {
            return userDAO.getUsersByRole(Role.MODERATOR);
        }
        return null;
    }

    public List<User> getRestrictedUsers(User loggedInUser) {
        if (isUserAdmin(loggedInUser)) {
            return userDAO.getUsersByRole(Role.RESTRICTED);
        }
        return null;
    }

    public List<User> getAllUsers(User loggedInUser) {
        if (isUserAdmin(loggedInUser)) {
            return userDAO.getAll();
        }
        return null;
    }

    protected String generateUsername(String name, String surname) {
        String username = name.trim().toLowerCase() + "." + surname.trim().toLowerCase();
        username = username.replaceAll("\\s+", ".");

        // Normalize the username and remove all non-ascii characters
        username = Normalizer.normalize(username, Normalizer.Form.NFD);
        username = username.replaceAll("[^\\p{ASCII}]", "");

        Long count = userDAO.countUsersWithSameUsername(username);
        if (count > 0) {
            username += String.valueOf(count + 1);
        }

        return username;
    }

    private User setUserRole(User user, Role newRole) {
        user.setRole(newRole);
        logger.info(format("Setting user %s, with id code %s role to: %s", user.getUsername(), user.getIdCode(), newRole.toString()));
        return userDAO.update(user);
    }

    public User update(User user, User loggedInUser) {
        if (isUserAdmin(loggedInUser)) {
            List<Taxon> taxons = new ArrayList<>();

            //Currently allowed to update only role and taxons
            User existingUser = getUserByUsername(user.getUsername());
            existingUser.setRole(Role.valueOf(user.getRole().toString()));

            List<Taxon> newTaxons = user.getUserTaxons();
            newTaxons.removeAll(Collections.singleton(null));

            if (newTaxons.size() > 0) {
                taxons = user.getUserTaxons()
                        .stream()
                        .map(taxon -> taxonService.getTaxonById(taxon.getId()))
                        .collect(Collectors.toList());
            }

            existingUser.setUserTaxons(taxons);
            return userDAO.update(existingUser);
        } else {
            throw new BadRequestException("Posting user must be administrator");
        }
    }
}
