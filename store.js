const items = document.querySelector(".item");
const descriptions = document.querySelector(".description");
const prices = document.querySelector(".price");
const quantitys = document.querySelector(".quantity");
const ul = document.querySelector(".listOfItems")


function myfunction(event) {
  event.preventDefault();
  console.log(event)

  let item = items.value;
  let description = descriptions.value;
  let price = prices.value;
  let quantity = quantitys.value;


  if (item && description && price && quantity) {
    let list = {
      item: item,
      description: description,
      price: price,
      quantity: quantity
    }



    document.querySelector('form').reset();
    // showData();

    // adding the items in shop
    axios.post("https://crudcrud.com/api/e99d4b603f1a4d3993a54777d0244758/AppData", list)
      .then((response) => {
        showData(response.data)
      })
      .catch((err) => {
        console.log(err);
      })

  } else {
    alert("Enter data to continue !");
  }
}

// for to refresh Page
function refresh() {
  axios.get("https://crudcrud.com/api/e99d4b603f1a4d3993a54777d0244758/AppData")
    .then((response) => {

      // console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {
        showData(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

window.addEventListener("DOMContentLoaded", refresh())


function showData(obj) {

  //appending list
  let li = document.createElement('li');
  let content = obj.item + "-" + obj.description + "-" + obj.price + "-" + obj.quantity + " ";
  let id = obj._id;
  li.textContent = content;
  ul.appendChild(li);
  // if(obj.quantity<0){
  //   alert("Item not available")
  // }



  //appending buttons
  const buy1 = document.createElement('input');
  buy1.setAttribute('type', 'button');
  buy1.setAttribute('value', 'Buy 1');
  buy1.setAttribute('name', 'buy' + id);
  buy1.setAttribute('onclick', 'buy1button(event)');
  li.appendChild(buy1);

  const buy2 = document.createElement('input');
  buy2.setAttribute('type', 'button');
  buy2.setAttribute('value', 'Buy 2');
  buy2.setAttribute('name', 'buy' + id);
  buy2.setAttribute('onclick', 'buy1button(event)');
  li.appendChild(buy2);

  const buy3 = document.createElement('input');
  buy3.setAttribute('type', 'button');
  buy3.setAttribute('value', 'Buy 3');
  buy3.setAttribute('name', 'buy' + id);
  buy3.setAttribute('onclick', 'buy1button(event)');
  li.appendChild(buy3);

};

function buy1button(e) {
  console.log(e);
  nameOfbtn = e.target.attributes[2].nodeValue;
  btnID = (nameOfbtn.slice(3, ));
  btnValue = e.target.defaultValue;
  btnNumber = (btnValue.slice(3, ));
  // console.log(btnNumber)

  // getting the items using its id
  axios.get("https://crudcrud.com/api/e99d4b603f1a4d3993a54777d0244758/AppData/" + btnID)
    .then((response) => {
      edit(response.data)
      // console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })

  // updating the values of quantity after buying
  function edit(obj) {
    axios.put('https://crudcrud.com/api/e99d4b603f1a4d3993a54777d0244758/AppData/' + btnID, {
        item: obj.item,
        description: obj.description,
        price: obj.price,
        quantity: obj.quantity - btnNumber,
        completed: true
      })
      .then((res) => {
        ul.innerHTML = ""
        if(obj.quantity<=0){

          alert("Item not available..! ")
          axios.delete('https://crudcrud.com/api/e99d4b603f1a4d3993a54777d0244758/AppData/' + btnID)
            .then((res) => {
              ul.innerHTML = ""
              refresh()
            })
            .catch(err=>console.log(err))
        }
        refresh()
      })

      .catch(err => console.log(err))
  }

}
