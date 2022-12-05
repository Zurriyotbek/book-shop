async function getData(url) {
  let response = await fetch(url);
  return await response.json();
}

export default getData;
