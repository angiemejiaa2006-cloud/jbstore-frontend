document.addEventListener('DOMContentLoaded', () => {
  // Cargar carrito si ya existe
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function agregarProductoAlCarritoObj(productoObj) {
    carrito.push(productoObj);
    guardarCarrito();
    alert(`${productoObj.nombre} agregado al carrito 🛒`);
  }

  
  const modal = document.getElementById('modalProducto');
  const modalImagen = document.getElementById('modalImagen');
  const modalNombre = document.getElementById('modalNombre');
  const modalPrecio = document.getElementById('modalPrecio');
  const cerrar = modal ? modal.querySelector('.cerrar') : null;
  const tallaSelect = document.getElementById('tallaSelect');
  const modalBtnAgregar = modal ? modal.querySelector('.btn-agregar') : null;

  
  document.querySelectorAll('.producto img, .producto h3').forEach(elemento => {
    elemento.addEventListener('click', (e) => {
      const tarjeta = e.target.closest('.producto');
      if (!tarjeta) return;

      const categoriaDiv = tarjeta.closest('.categoria');
      const categoriaId = categoriaDiv ? categoriaDiv.id : '';

      const imgSrc = tarjeta.querySelector('img')?.src || '';
      const nombre = tarjeta.querySelector('h3')?.textContent.trim() || 'Producto';
      const precioText = tarjeta.querySelector('.precio')?.textContent || '';

          
    const contenedorTallas = document.getElementById('contenedorTallas');
    if (contenedorTallas) {
      if (categoriaId.trim().toLowerCase() === 'ropa') {
        contenedorTallas.style.display = 'block';
      } else {
        contenedorTallas.style.display = 'none';
      }
    }


     
      modalImagen.src = imgSrc;
      modalNombre.textContent = nombre;
      modalPrecio.textContent = precioText;
      modal.style.display = 'flex';
    });
  });


  if (cerrar) {
    cerrar.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });


  if (modalBtnAgregar) {
    modalBtnAgregar.addEventListener('click', () => {
      const nombre = modalNombre.textContent.trim();
      const precioRaw = modalPrecio.textContent.replace(/[^\d]/g, '');
      const precio = precioRaw ? parseInt(precioRaw, 10) : 0;
      const imagen = modalImagen.src;
      const talla = tallaSelect.style.display === 'block' ? tallaSelect.value : null;

      agregarProductoAlCarritoObj({ nombre, precio, imagen, talla, cantidad: 1 });
      modal.style.display = 'none';
    });
  }

  
  document.querySelectorAll('.producto .btn-agregar').forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.stopPropagation();
      const tarjeta = boton.closest('.producto');
      if (!tarjeta) return;
      const nombre = tarjeta.querySelector('h3')?.textContent.trim() || 'Producto';
      const precioText = tarjeta.querySelector('.precio')?.textContent || '';
      const precioNum = parseInt(precioText.replace(/[^\d]/g, ''), 10) || 0;
      const img = tarjeta.querySelector('img')?.src || '';

      agregarProductoAlCarritoObj({ nombre, precio: precioNum, imagen: img, cantidad: 1 });
    });
  });


  function actualizarContador() {
    const contador = document.getElementById('cart-count');
    if (!contador) return;
    const total = carrito.reduce((s, p) => s + (p.cantidad || 1), 0);
    contador.textContent = total;
  }
  actualizarContador();
});
