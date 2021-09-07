const getData = () => fetch("../photographers.json", )
  .then(res => res.json())
  .catch(err => console.log("", err))
  