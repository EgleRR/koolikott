package ee.hm.dop.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

/**
 * Created by mart.laus on 17.06.2015.
 */

@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Classification {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "classificationName", nullable = false)
    private String name;

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    private List<Classification> children;

    @ManyToOne
    @JoinColumn(name = "parent")
    private Classification parent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Classification> getChildren() {
        return children;
    }

    public void setChildren(List<Classification> children) {
        this.children = children;
    }

    public Classification getParent() {
        return parent;
    }

    public void setParent(Classification parent) {
        this.parent = parent;
    }
}