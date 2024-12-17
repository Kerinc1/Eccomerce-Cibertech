import React, { useState, useEffect } from 'react';
import { addItem, getItems, deleteItem, updateItem } from './services/itemServices';
import { getUser } from './services/userService';
import { useNavigate } from 'react-router-dom';
import SignOut from './sign';
import "./index.css"

const ProductList = () => {
    const [form, setForm] = useState({ nameItem: '', descriptionItem: '', priceItem: '', quantityItem: '' });
    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        verifyAccountType();
    }, []);

    const verifyAccountType = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            alert('Por favor, inicia sesión para agregar productos.');
            navigate('/login');
            return;
        }

        try {
            const fetchedUser = await getUser(storedUser._id);

            if (fetchedUser.accountType !== 'vendedor') {
                alert('Solo los vendedores pueden agregar productos. Si deseas vender, por favor, cambia tu tipo de cuenta.');
                navigate('/');
            } else {
                fetchItems(fetchedUser._id);
            }
        } catch (error) {
            console.error('Error obteniendo la información del usuario:', error);
            alert('Hubo un error verificando la cuenta del usuario.');
        }
    };

    const fetchItems = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        try {
            const data = await getItems(storedUser._id);
            setItems(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };
    

    const handleAddItem = async (e) => {
        e.preventDefault();
    
        if (!image) {
            alert('Por favor selecciona una imagen.');
            return;
        }
    
        const formData = new FormData();
        formData.append('nameItem', form.nameItem);
        formData.append('descriptionItem', form.descriptionItem);
        formData.append('priceItem', form.priceItem);
        formData.append('quantityItem', form.quantityItem);
        formData.append('image', image);
    
        try {
            await addItem(formData);
            await fetchItems(); // Recargar productos
            alert('Producto agregado con éxito.');
            setForm({ nameItem: '', descriptionItem: '', priceItem: '', quantityItem: '' });
            setImage(null);
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Hubo un error al agregar el producto.');
        }
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('nameItem', form.nameItem);
        formData.append('descriptionItem', form.descriptionItem);
        formData.append('priceItem', form.priceItem);
        formData.append('quantityItem', form.quantityItem);
        if (image) {
            formData.append('image', image);
        }
    
        try {
            await updateItem(editingItemId, formData);
            await fetchItems(); // Recargar productos
            alert('Producto actualizado con éxito.');
            setEditingItemId(null);
            setForm({ nameItem: '', descriptionItem: '', priceItem: '', quantityItem: '' });
            setImage(null);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            alert('Hubo un error al actualizar el producto.');
        }
    };
    
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (!confirmDelete) return;
    
        try {
            await deleteItem(id);
            setItems((prevItems) => prevItems.filter((item) => item._id !== id));
            alert('Producto eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            
        }
    };
    
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const startEditing = (item) => {
        setEditingItemId(item._id);
        setForm({ nameItem: item.nameItem, descriptionItem: item.descriptionItem, priceItem: item.priceItem, quantityItem: item.quantityItem });
        setImage(null);
    };

    return (
        <div>
            <header className="header-container">
                <nav id="nav-container">
                    <a href='/'>
                        <img src="/images/CIBERTECH01.png" alt="Cibertech" className="image-logo" />
                    </a>
                    <div className='nav-middle'>
                        <div className="div-products-container" id="container-in-header">
                            <a href="/#products" className="a-products">Productos</a>
                        </div>
                        <div className="div-about-us-container" id="container-in-header">
                            <a href="/#about-us" className="a-about-us">Acerca de nosotros</a>
                        </div>
                    </div>
                    <SignOut />
                </nav>
            </header>

            <h1 className='title-inventory'>INVENTARIO</h1>

            <form onSubmit={editingItemId ? handleUpdate : handleAddItem} className='form-inventory'>
                <h4>Ingresa el nombre del producto</h4>
                <input name="nameItem" placeholder="Nombre del producto" value={form.nameItem} onChange={handleChange} required />
                <h4>Ingresa una descripción al producto</h4>
                <input name="descriptionItem" placeholder="Descripción" value={form.descriptionItem} onChange={handleChange} required />
                <h4>Ingresa el precio del producto</h4>
                <input name="priceItem" placeholder="Precio" value={form.priceItem} onChange={handleChange} required />
                <h4>Ingresa la cantidad disponible</h4>
                <input name="quantityItem" placeholder="Cantidad" value={form.quantityItem} onChange={handleChange} required />
                <h4>Ingresa una imagen del producto</h4>
                <input type="file" onChange={handleImageChange} required />
                <button type="submit" className='button-login'>{editingItemId ? "Actualizar producto" : "Agregar producto"}</button>
            </form>

            <h2 className='subtitle-inventory'>Lista de Productos</h2>
            <ul className='ul-inventory'>
                {items.map((item) => (
                    <li key={item._id} className='item'>
                        <h3 className='name-item'>{item.nameItem}</h3>
                        <p className='description-item'>{item.descriptionItem}</p>
                        <p className="price-item">Precio: ${item.priceItem.toLocaleString('es-ES')}</p>
                        <p className='quantity-item'>Cantidad: {item.quantityItem}</p>
                        <div className='container-img'>
                            {item.image && <img src={item.image} alt={item.nameItem} width="200"  style={{ borderRadius: '5%'  }} className='img-product' />}
                        </div>
                        <button onClick={() => handleDelete(item._id)} className='button-delete'>Eliminar</button>
                        <button onClick={() => startEditing(item)}  className='button-update'>Actualizar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
