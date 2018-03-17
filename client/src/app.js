document.body.innerHTML = `<h1>Hello from ${d3.version}</h1>`;

d3
  .request(`/api/latest_updates/${new Date().getFullYear()}`)
  .get((error, request) => {
    const data = JSON.parse(request.response);
    console.log(data.latestupdates.lastUpdatedOn);
  });
