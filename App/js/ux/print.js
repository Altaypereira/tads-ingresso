function PrintElem(elem)
{   
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title> Ingresso </title>');
    mywindow.document.write('<style>@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap")</style></head><body >');
    mywindow.document.write("<div id='ingresso' style='width:100%;display:flex;align-items:center;justify-content:center'>")
    mywindow.document.write(elem.parentElement.parentElement.outerHTML);
    mywindow.document.write("</div>")
    mywindow.document.write('</body></html>');

    mywindow.document.querySelectorAll('button').forEach(btn => {
        btn.style.display = 'none'
    })

    mywindow.document.write('<h3> Valide seu ingresso em: </h3>');
    const url = mywindow.document.querySelector('a').getAttribute('href')
    mywindow.document.write(`<a href='${url}' target='_blank'> ${url} </a>`);
    mywindow.document.write('<style> *{font-family: Inter, sans-serif;text-align: center} a{color: #000; text-decoration: none;font-weight: bold;} </style>');
    mywindow.document.write('<hr><h2>Ou</h2><hr>');

    mywindow.document.write('<h3> Visualize seu QR Code em: </h3>');
    const img = elem.parentElement.parentElement.querySelector('.ticket-qr').style.backgroundImage.slice(5, -2);
    mywindow.document.write(`<center><img src='${img}' style='width: 200px;'></center>`);



    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}