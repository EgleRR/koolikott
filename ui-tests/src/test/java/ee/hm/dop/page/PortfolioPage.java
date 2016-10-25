package ee.hm.dop.page;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import ee.hm.dop.components.AddPortfolioBasic;
import ee.hm.dop.components.ConfirmationDialogPopup;
import ee.hm.dop.helpers.PageHelpers;

public class PortfolioPage extends Page {

	private By menuBar = By.xpath("//md-icon[text()='more_vert']");
	private By editPortfolio = By.xpath("//button[@data-ng-click='editPortfolio()']");
	private By improperContent = By.xpath("//button[@data-ng-click='showConfirmationDialog()']");
	private By removeButton = By.xpath("//button[@data-ng-click='confirmPortfolioDeletion()']");
	private By notImproperContent = By.xpath("//button[@data-ng-click='setNotImproper()']");
	private By addedTag = By.xpath("//a[@data-ng-click='getTagSearchURL($event, $chip.tag)']");
	private By recommendationList = By.xpath("//button[@data-ng-click='recommend()']");
	private By removeFromRecommendations = By.xpath("//button[@data-ng-click='removeRecommendation()']");
	private By fabButton = By.xpath("//md-fab-trigger");
	private By unselectedStar = By.cssSelector("div.md-icon-button.md-button > md-icon.material-icons");
	private By selectedStar = By.cssSelector("md-icon.gold.material-icons");
	private By copyPortfolioButton = By.xpath("//button[@data-ng-click='copyPortfolio()']");
	private By portfolioTitle = By.xpath("//h1[@data-ng-bind='portfolio.title']");
	private By addPortfolioMessage = By.cssSelector("h3");
	private By creatorName = By.xpath("//p[@data-ng-if='isNullOrZeroLength(material.authors)']");
	private By materialBox = By.cssSelector("md-card-content.portfolio-noedit-item.layout-row");
	private By notImproperContentDisabled = By.cssSelector("button[data-ng-click='setNotImproper()'][aria-disabled='true']");
			//By.xpath("//button[contains(@data-ng-click, 'setNotImproper()')][contains(@aria-disabled,'true')]");


	public PortfolioPage clickActionsMenu() {
		PageHelpers.waitForVisibility(menuBar);
		getDriver().findElement(menuBar).click();
		PageHelpers.waitForSeconds(1500);
		return this;
	}

	public PortfolioPage moveCursorToCopyPortfolio() {
		Actions builder = new Actions(getDriver());
		WebElement copyPortfolio = getDriver().findElement(fabButton);
		builder.moveToElement(copyPortfolio).perform();
		return this;
	}
	
	public PortfolioPage unselectStar() {
		PageHelpers.waitForVisibility(selectedStar);
		getDriver().findElement(selectedStar).click();
		return this;
	}

	public AddPortfolioBasic clickCopyPortfolio() {
		PageHelpers.waitForVisibility(copyPortfolioButton);
		getDriver().findElement(copyPortfolioButton).click();
		return new AddPortfolioBasic();
	}

	public EditPortfolioPage clickEditPortfolio() {
		getDriver().findElement(editPortfolio).sendKeys(Keys.ENTER);
		PageHelpers.waitForSeconds(1500);
		getDriver().navigate().refresh();
		PageHelpers.waitForSeconds(1500);
		return new EditPortfolioPage();
	}

	public PortfolioPage addToRecommendationsList() {
		getDriver().findElement(recommendationList).sendKeys(Keys.ENTER);
		PageHelpers.waitForSeconds(3500);
		return this;
	}

	public ConfirmationDialogPopup clickNotifyImproperContent() {
		getDriver().findElement(improperContent).sendKeys(Keys.ENTER);
		PageHelpers.waitForSeconds(2500);
		return new ConfirmationDialogPopup();
	}
	
	public ConfirmationDialogPopup clickRemovePortfolio() {
		getDriver().findElement(removeButton).sendKeys(Keys.ENTER);
		PageHelpers.waitForSeconds(2500);
		return new ConfirmationDialogPopup();
	}

	public boolean removeFromRecommendationListIsDisplayed() {
		PageHelpers.waitForSeconds(1500);
		return getDriver().findElement(removeFromRecommendations).isDisplayed();

	}
	
	public PortfolioPage setContentIsNotImproper() {
		PageHelpers.waitForVisibility(notImproperContent);
		getDriver().findElement(notImproperContent).click();
		PageHelpers.waitForSeconds(1500);
		return this;
	}


	public boolean contentsIsNotImproperIsDisabled() {
		PageHelpers.waitForVisibility(notImproperContentDisabled);
        return getDriver().findElement(notImproperContentDisabled).isDisplayed();
	

	}
	
	public boolean starIsSelected() {
		PageHelpers.waitForVisibility(selectedStar);
		return getDriver().findElement(selectedStar).isDisplayed();

	}
	
	public boolean starIsUnselected() {
		return getDriver().findElement(unselectedStar).isDisplayed();

	}
	

	public String getTagText() {
		return getDriver().findElement(addedTag).getText();

	}
	
	public boolean getAddPortfolioMessageText() {
		PageHelpers.waitForVisibility(addPortfolioMessage);
		return getDriver().findElement(addPortfolioMessage).getText().contains("Kogumiku lisamiseks");

	}

	public boolean wordCopyIsAddedToPortfolioTitle() {
		return getDriver().findElement(portfolioTitle).getText().contains("(Copy)");

	}
	
	public String getCreatorName() {
		return getDriver().findElement(creatorName).getText();

	}
	

	public boolean isMaterialBoxIsDisplayed() {
		return getDriver().findElement(materialBox).isDisplayed();
	}

}