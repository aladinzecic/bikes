async function getText(file) {
    let x = await fetch(file);
    let y = await x.text();
    console.log(x)
  }

  getText("http://api.citybik.es/v2/networks");
