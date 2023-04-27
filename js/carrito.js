//variables
document.addEventListener('DOMContentLoaded', () => {
    const bd=[
        {
            id:1,
            nombre:'Hamburguesa Con Chorizo',
            descipcion:'Incluye chorizo en la carne, dándole un sabor ahumado y picante.Y tambien incluye multiples cremas.',
            precio:9,
            imagen:'img/chorizo.png'
        },
        {
            id:2,
            nombre:'Hamburguesa Con Huevo',
            descipcion:'Incluye un huevo frito encima de la carne, añadiéndole una textura cremosa y un sabor único.',
            precio:8,
            imagen:'img/hambuguesa-con-huevo.png'
        },
        {
            id:3,
            nombre:'Hamburguesa krispy',
            descipcion:'Con crujientes papas fritas o aros de cebolla y descubre una nueva experiencia en sabor.',
            precio:11,
            imagen:'img/hambuguesa-krispy.png'
        },
        {
            id:4,
            nombre:'Hamburguesa Pollo-Desilachado',
            descipcion:'Saludable y deliciosa, con un sabor suave y una textura tierna.',
            precio:10,
            imagen:'img/Pollo-desilachado.png'
        },
        {
            id:5,
            nombre:'Hamburguesa mediterraneo',
            descipcion:'Saludable con sabores frescos de tomate, aceitunas, queso feta y hierbas.Y tambien contiene una variedad de cremas. ',
            precio:13,
            imagen:'img/mediterraneo.png'
        },
        {
            id:6,
            nombre:'Hamburguesa a la Cubana',
            descipcion:'Con jamón, queso, chorizo, huevo frito y condimentos picantes.Y tambien contiene una ligera estructura de carne.',
            precio:11,
            imagen:'img/cubana.png'
        },
        {
            id:7,
            nombre:'Hamburguesa Hawaina',
            descipcion:'Sabores tropicales de piña, jamón, queso y salsa especial, una opción deliciosa y refrescante',
            precio:10,
            imagen:'img/hawaiana.png'
            
        },
        {
            id:8,
            nombre:'Hamburguesa de Tocino',
            descipcion:'Sabores ahumados de tocino crujiente, queso, lechuga, tomate y una variedad de cremas especiales.',
            precio:13,
            imagen:'img/tocino.png'
        },
        {
            id:9,
            nombre:'Hamburguesa Vegana',
            descipcion:'Saludable de vegetales frescos, frijoles, granos y condimentos, una opción deliciosa.',
            precio:8,
            imagen:'img/vegana.png'
        },
        {
            id:10,
            nombre:'Hamburguesa Royal',
            descipcion:'Con doble carne, queso, tocino, lechuga, tomate y salsas especiales.Y tambien incluimos las famosas papitas al hilo. ',
            precio:12,
            imagen:'img/royal.png'
        },
        
    
    ]
    //variable que es modificable 
    let carrito=[];
    //variables que no pueden ser modificacas
    const divisa='S/.';
    const DOMitems=document.querySelector('#items');
    const DOMcarrito=document.querySelector('#carrito');
    const DOMtotal=document.querySelector('#total');
    const DOMbotonvaciar=document.querySelector('#boton-vaciar');
    const DOMpa=document.querySelector('#toggle-btn');
    var lista = document.getElementById("items");
    var itemsPorPagina = 2;
    var paginaActual = 1;
    //funciones
    
    /**
     * dibuha todos los productos a partir de la base de datos.No confunvir con el carrito
     */
    // Obtener el elemento contenedor donde se mostrarán los productos


    function renderizarProductos(){
        bd.forEach((info)=>{
            //estrucuta 
            const miNodo=document.createElement('div');
            miNodo.classList.add('s','mb-5');
            miNodo.setAttribute("id","lista")
            //body
            const niNodoCardBody=document.createElement('div');
            niNodoCardBody.classList.add('card-body');
            //titulo
            const niNodotitle=document.createElement('h5');
            niNodotitle.classList.add('card-title','pt-3');
            niNodotitle.textContent=info.nombre;
            //descripcion
            const minododescripcion=document.createElement('p');
            minododescripcion.classList.add('card-text','textos');
            minododescripcion.textContent=info.descipcion;
            //imagen
            const minodoimagen=document.createElement('img');
            minodoimagen.classList.add('img-fluid');
            minodoimagen.setAttribute('src',info.imagen);
            //precio
            const div=document.createElement('div');
            div.classList.add('divs');
            const minodoprecio=document.createElement('p');
            minodoprecio.classList.add('card-text','precio','pt-3');
            minodoprecio.textContent=`${divisa}${info.precio}.00`;
            //boton
            const minodobutton=document.createElement('button');
            minodobutton.classList.add('btssx','bg-dark');
            minodobutton.textContent='Agregar Producto';
            minodobutton.setAttribute('marcador',info.id);
            minodobutton.addEventListener('click',anyadirProductoAlCarrito);
    
            //insertemos
            niNodoCardBody.appendChild(minodoimagen);
            niNodoCardBody.appendChild(niNodotitle);
            niNodoCardBody.appendChild(minododescripcion);
            niNodoCardBody.appendChild(minodoprecio);
            div.appendChild(minodobutton);
            niNodoCardBody.appendChild(div);
            //niNodoCardBody.appendChild(minodobutton);
            miNodo.appendChild(niNodoCardBody);
            DOMitems.appendChild(miNodo);
    
        });

    }
    /**
     * evento para añadir un producto al carrito de compras
     */
    function anyadirProductoAlCarrito(evento) {
        //añadimps el nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
    }
    /**
     * dibuja todos losprocutos guardados en el carrito
     */
    function renderizarCarrito() {
        //vaciamos todo el html
        DOMcarrito.textContent='';
        //quitamos los duplicados
        const carritosinduplicados=[...new Set(carrito)];
        //generamos los nodos apartir del carrito
        carritosinduplicados.forEach((item)=>{
            //obtenemos el item que necesitamos con la variable bd
            const miItem=bd.filter((itemBasededatos)=>{
                return itemBasededatos.id===parseInt(item);
            });
            //cuenta el numero de veces  qye se repite el produto
            const numeroUnidadesitem=carrito.reduce((total,itemId)=>{
                return itemId===item ? total +=1:total;
            },0);
    
            //creammos el noodoe del item del carrito
            const minodo=document.createElement('li');
            minodo.classList.add('list-group-item','text-left','mb-3');
            minodo.textContent=`${numeroUnidadesitem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}.00`;
            //boton de borrar
            const miboton=document.createElement('button');
            miboton.classList.add('btn','btn-danger','equis');
            miboton.textContent='X';
            miboton.style.marginLeft='1rem';
            miboton.dataset.item=item;
            miboton.addEventListener('click',borrarItemCarrito);
            //mesclamos los nodos
            minodo.appendChild(miboton);
            DOMcarrito.appendChild(minodo);
        });
        //renderizamos el precio total del html
        DOMtotal.textContent=calcularTotal();
        document.getElementById("ultimo").textContent = calcularTotal();
        document.getElementById("ultimos").textContent = calcularTotal();
        document.getElementById("ultimoss").textContent = calcularTotal();
    }
    
    /**
     * eventi para borrar un elemento del carrito
     */
    function borrarItemCarrito(evento) {
        //obtenemmos el prodcuto ID que hay en ek buton pulsado
        const id=evento.target.dataset.item;
        //borramos todos los productos
        carrito=carrito.filter((carritoId)=>{
            return carritoId !==id;
        });
        //volvemos a renderizar
        renderizarCarrito();
    
        
    }
    
    /**
     * calcula el precio toal teniendo en cuenta los prodcutos repetidos
     */
    function calcularTotal(){
        //recooremos el array del carrito
        return carrito.reduce((total,item)=>{
            //de cada elemento obtenemos su precio
            const miItem=bd.filter((itemBasededatos)=>{
                return itemBasededatos.id===parseInt(item);
            });
            //lo sumamos al total
            return total + miItem[0].precio;
        },0).toFixed(2);
    }
    
    /**
     * varia el carrito y vuelve a dibujarlo
     */
    function vaciarCarrito() {
        var si=document.getElementById("si");
        console.log(si)
        if (carrito==0) {

                
            /*const ales=document.querySelector('#ale');
            ales.classList.add('ale');
            setTimeout(function() {
                $("#ale").fadeOut(1200);
            },2000);*/
                //hecho con ajax
                //var notif=document.getElementById("liveToast");
                
                //$('#liveToast').modal('show');
                const toastTrigger = document.getElementById('boton-vaciar')
                const toastLiveExample = document.getElementById('liveToast')
                if (toastTrigger) {
                
                    const toast = new bootstrap.Toast(toastLiveExample)

                    toast.show()
            
                }
                 

                /*setTimeout(function() {
                    $("#liveToast").fadeOut(1200);
                },2000);*/
                
          
           
        }else{
            if(carrito ==0){
                /*const aless=document.querySelector('#alex');
            aless.classList.add('ale2');
            setTimeout(function() {
                $("#alex").fadeOut(1200);
            },2000);*/
                console.log('no ai ningun valor')
            
            }
            else{
                $('#modal-1').modal('show');
                
                si.addEventListener("click", cambio_valor);
            }
            
            
            
        }
    }
    function pagar() {
        var cal=calcularTotal()
        
        
        if (cal==0) {
            const toastTrigger = document.getElementById('toggle-btn')
            const toastLiveExample = document.getElementById('liveToasts')
            if (toastTrigger) {
            
                const toast = new bootstrap.Toast(toastLiveExample)

                toast.show()
        
            }
        }else{
            
                /*$("#toggle-btn").click(function(){
                  $("#toggle-example").collapse('toggle'); // toggle collapse
                });*/

            /*const toastTrigger = document.getElementById('toggle-btn')
            const toastLiveExample = document.getElementById('toggle-example')
            if (toastTrigger) {
            
                const toast = new bootstrap.Toast(toastLiveExample)

                toast.show()
        
            }*/
            const collapseElementList = document.querySelectorAll('.collapse')
            const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl))
        }
    }
    function cambio_valor() {
            //limiapos los productos guardados
        carrito=[];
            //renderizamos los cambios
        renderizarCarrito();
      }
    
    //paginador
    function mostrarItems() {
      var inicio = (paginaActual - 1) * itemsPorPagina;
      var fin = inicio + itemsPorPagina;

      for (var i = 0; i < lista.children.length; i++) {
        var item = lista.children[i];

        if (i >= inicio && i < fin) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    }

    function cambiarPagina(pagina) {
      paginaActual = pagina;
      mostrarItems();
    }

    document.getElementById("anterior").addEventListener("click", function() {
      if (paginaActual > 1) {
        cambiarPagina(paginaActual - 1);
      }
    });

    document.getElementById("siguiente").addEventListener("click", function() {
      if (paginaActual < Math.ceil(lista.children.length / itemsPorPagina)) {
        cambiarPagina(paginaActual + 1);
      }
    });
    
    
    
    //eventos
    DOMbotonvaciar.addEventListener('click',vaciarCarrito);
    DOMpa.addEventListener('click',pagar);
    //iniico 
    renderizarProductos();
    renderizarCarrito();
    mostrarItems();
  
    
});













