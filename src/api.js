export async function fetchImages(breed) {
    const response = await fetch(
        `https://aws.random.cat/meow`, {
            mode: 'cors'
          })
    var data = await response.json();
    console.log(data);
    return data.file;
  }