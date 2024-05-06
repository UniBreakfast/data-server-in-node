const server = require('http').createServer();
const link = 'http://localhost:3000';

server.listen(3000, () => console.log(link));

server.on('request', handleRequest);

function handleRequest(request, response) {
  if (request.method === 'GET') return response.end(page);

  let body = '';

  request.on('data', chunk => body += chunk);

  request.on('end', () => {
    try {
      body = JSON.parse(body);
    } catch { }

    console.log('received:', body);

    const entries = Object.entries(body);

    console.log('sent:', entries);

    const json = JSON.stringify(entries);

    response.writeHead(200, { 'Content-Type': 'text/json' }).end(json);
  })
}

const page = `<script>
  const body = JSON.stringify({first: 'John', last: 'Doe', age: 33});

  setTimeout(() => document.body.innerText += 'sent: ' + body + '\\n');
  
  fetch('/', {method: 'POST', body})
    .then(response => response.json())
    .then(data => document.body.append('received: ' + JSON.stringify(data)));
</script>`;
