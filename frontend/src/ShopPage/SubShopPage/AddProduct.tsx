import { ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { storage } from '../../firebase/firebase'
import ShopFooter from '../../ShopComponent/ShopFooter'
import ShopNavbar from '../../ShopComponent/ShopNavbar'
import './style/addproductstyle.scss'

export default function AddProduct() {

    let location = useLocation()
    const [categories, setCategories] = useState<any[]>([])
    const [selectVal, setSelectVal] = useState('CT001')
    const [productName, setProductName] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productStock, setProductStock] = useState('')
    const [productDetails, setProductDetails] = useState('')
    const [productId, setProductId] = useState('')

    const [imageUpload, setImageUpload]=useState<any>(null)

    const [getLoginData, setLoginData] = useState('')
    const [getIdLoginData, setIdLoginData] = useState('')

    const data = location.state

    //add product api 
    const addProductData = async () => {

        let p1 = Math.floor(Math.random()*9+0)
        let p2 = Math.floor(Math.random()*9+0)
        let p3 = Math.floor(Math.random()*9+0)

        setProductId("PR"+p1.toString()+p2.toString()+p3.toString())

        //add product 
        await fetch("http://localhost:8000/api/store/add-product",{
            method: 'POST',
            body: JSON.stringify({
                productid: productId,
                categoryid: selectVal,
                productname: productName,
                productstock: parseInt(productStock),
                productprice: parseInt(productPrice),
                productdesc: productDesc,
                productdetail: productDetails,
                storeemail: getLoginData
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })

       
    }


    //add store transactions
    const addStoreTransactions = async () => {
        let t1 = Math.floor(Math.random()*9+0)
        let t2 = Math.floor(Math.random()*9+0)
        let t3 = Math.floor(Math.random()*9+0)
        //add store transactions 
        await fetch("http://localhost:8000/api/store/add-store-transactions", {
            method: 'POST',
            body: JSON.stringify({
                storetransid: "TR"+t1+t2+t3,
                shopid: getIdLoginData, 
                productid: productId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>console.log(res.json()))

        alert('product added ')
    }

    //get current user 
    const getCurrUser = async () => {
        await fetch("http://localhost:8000/api/store/get-login-store", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setLoginData(data.data.store.shopemail)
            setIdLoginData(data.data.store.shopid)
        })
    }

    //add image 
    const uploadImage = () => {
        if(imageUpload === null) return
        const imageRef = ref(storage, `product-images-${data.shopid}/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then((snapshot)=>{
            console.log('iamge upload')     
        })
   
    }

    const AddData = () => {
        addProductData()
        addStoreTransactions()
        uploadImage()

        setProductName('')
        setProductDesc('')
        setProductPrice('')
        setProductStock('')
        setProductDetails('')
    }

    //laod category 
    const LoadCategory = async () => {
        await fetch("http://localhost:8000/api/category/categories", {
            method:'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((dat)=>{
            console.log(dat.categories)
            setCategories(dat.categories)
        })
    }

    useEffect(()=>{
        LoadCategory()
    }, [])



  return (
    <div>
        <ShopNavbar props={getLoginData} />
        <div className='wrap-add-page'>
            <div className='header'>
                <h3>Add Product</h3>
            </div>
            <div className='body'>
                <div className='form-add-product'>
                    <div>
                        <p>Product Name: </p>
                        <input value={productName} onChange={(e)=>setProductName(e.target.value)} />
                    </div>
                    <div>
                        <p>Product Category: </p>
                        <select value={selectVal} onChange={(e)=>setSelectVal(e.target.value)}>
                            {
                                categories.map((ca, idx) => {
                                    return(
                                        <option key={idx} value={ca.ID}>{ca.CategoryName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <p>Product Description: </p>
                        <input value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} />
                    </div>
                    <div>
                        <p>Product Price: </p>
                        <input value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} />
                    </div>
                    <div>
                        <p>Product Stock: </p>
                        <input value={productStock} onChange={(e)=>setProductStock(e.target.value)} />
                    </div>
                    <div>
                        <p>Product Details: </p>
                        <textarea cols={30} rows={5} value={productDetails} onChange={(e)=>setProductDetails(e.target.value)}></textarea>
                    </div>
                    <div>
                        <p>Product Images: </p>
                        <input type={'file'} onChange={(e)=>setImageUpload((e.target.files!=null)?e.target.files[0]:'')} />
                    </div>
                    <div className='wrap-btn-add'>
                        <button onClick={()=>AddData()}>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
        <ShopFooter />
    </div>
  )
}
