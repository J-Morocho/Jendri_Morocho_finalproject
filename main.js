
const bob = {
  name: "Bob",
  totalPoints: 1000,
  claimedRewards: [],
}


class Reward {
  constructor(providerName, discountOffered, discountCode, uniqueID, companyLogo, pointsCost) {
    this._providerName = providerName;
    this._discountOffered = discountOffered;
    this._discountCode = discountCode;
    this._uniqueID = uniqueID;
    this._companyLogo = companyLogo;
    this._pointsCost = pointsCost;
  }
  
}

function chooseRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)]
}


// our data
const couponsArray = [new Reward("Banana Republic", "25% off", "free25", "", "assets/brepublic-logo.png", "100"), 
                      new Reward("Gap", "20% off", "offer20", "", "assets/gap-logo.jpeg", "80"),
                      new Reward("Amazon", "Free Shipping", "welcome40", "","assets/amazon-logo.png", "500"),
                      new Reward("General Store", "$5 off", "grandopening", "", "assets/no-img.jpeg", "5"),
                      new Reward("General Store", "$5 off", "grandopening", "", "assets/no-img.jpeg", "5")]


// create floating card
function createCard(companyRewardObject) {
  // createCard takes in a reward object and creates HTML elements in order to display its contents
  // an event listener is added to the card to enable redeem functionality
  // create the card that will hold all information
  let rewardContainerCard = document.createElement("div")
  rewardContainerCard.setAttribute('class', 'reward'); 
  // set img HTML element
  let companyImage = document.createElement('img');
  companyImage.setAttribute('class', 'company-image');
  companyImage.setAttribute('src', companyRewardObject._companyLogo);
  // create div to hold reward details
  let details = document.createElement('div');
  details.setAttribute('id', 'details')
  
  let pOfferingCompany = document.createElement('p');
  let pDiscountOffered = document.createElement('p');
  pOfferingCompany.setAttribute('class', 'offering-company');
  pDiscountOffered.setAttribute('class', 'discount-offered');
  pOfferingCompany.innerHTML = companyRewardObject._providerName; 
  pDiscountOffered.innerText = companyRewardObject._discountOffered;
  pDiscountOffered.insertAdjacentHTML('beforeend', '<br>')

  // create redeem button and add event listener
  let redeemButton = document.createElement('input');
  redeemButton.setAttribute('class', 'reward-claim-button')
  redeemButton.setAttribute('type', 'button');
  redeemButton.setAttribute('value', 'Redeem');
  redeemButton.onclick = function () {
    rewardContainerCard.setAttribute('class', 'onclick-hide')
    rewardContainerCard.remove();
    bob.claimedRewards.push(companyRewardObject._providerName)
    bob.totalPoints -= companyRewardObject._pointsCost;
    document.querySelector('#totalPoints').innerText = bob.totalPoints;
    document.querySelector('#totalPoints').insertAdjacentHTML('beforeend', " Points");
  };

  // display cost of reward on the card
  let pPointsCost = document.createElement('p');
  pPointsCost.setAttribute('class', 'discount-code');
  pPointsCost.innerText = companyRewardObject._pointsCost;
  pPointsCost.insertAdjacentHTML('beforeend', " Points")
  
  // add all created elements as child nodes of the details div
  details.append(pOfferingCompany,pDiscountOffered, redeemButton, pPointsCost)
  console.log(details)
  rewardContainerCard.append(companyImage, details);
  document.querySelector('.rewards-container').appendChild(rewardContainerCard)
}

for (let i=0; i < couponsArray.length; i++) {
  createCard(couponsArray[i]);
}

let pTotalPoints = document.querySelector('#totalPoints')
pTotalPoints.innerHTML = bob.totalPoints
pTotalPoints.insertAdjacentHTML('beforeend', " Points")

document.querySelector("#userName").innerText = bob.name;

function getSearchQuery() {
  let query = document.querySelector('#search').value
  
  // search our couponsArray
  let rewardsMatchedQuery = []
  for (const reward in couponsArray) {
    const valuesArray = Object.values(couponsArray[reward])
    if (valuesArray.includes(query)) {
      // if query is in the values array then create a card with the corresponding reward object
      rewardsMatchedQuery.push(couponsArray[reward]);
    }
  }

  clearRewardsContainer();

  for (const reward in rewardsMatchedQuery){
    createCard(rewardsMatchedQuery[reward]);
  }
  
}

function clearRewardsContainer() {
  document.querySelector('.rewards-container').innerHTML = "";
}

let submit = document.querySelector('#search-btn')
submit.addEventListener('click', getSearchQuery)

