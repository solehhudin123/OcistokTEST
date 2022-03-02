/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logoOcistok from '../public/logo.PNG'
import { getProducts } from "../redux/reducer/ProductSlice";
// #ff8b00
export default function Home() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.listProduct)
  console.log("🚀 ~ file: index.js ~ line 11 ~ Home ~ products", products)
  const productsStatus = useSelector(state => state.product.status)
  console.log("🚀 ~ file: index.js ~ line 12 ~ Home ~ productsStatus", productsStatus)
  const [productAll, setproductAll] = useState([])
  useEffect(() => {
    if (productsStatus == null) {
      dispatch(getProducts())
    }else if (productsStatus === 'success') {
      setproductAll(products.data)
    }
  }, [productsStatus])

  function handleRemove(id,e){
    e.preventDefault();
    console.log(id)
    const productFilter = productAll.filter(product => {
      return product.id_product !== id && product
    })
    setproductAll(productFilter)
  }
  return (
    <>
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-50 py-4 shadow-sm bg-ocistok">
          <div className="container flex items-center justify-between">
              <div className="ml-10">
                <Image
                  src={logoOcistok}
                  alt="Picture of the author"
                  width={150}
                  height={60}
                />
              </div>
              <div className="w-full max-w-xl relative">
                <input type="text" className="w-full border border-r-0 pl-4 py-3 pr-3 rounded-xl focus:outline-none" placeholder="Search"/>
                <span className="absolute right-4 top-3 text-lg text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="rounded-2xl bg-white py-1 pr-3 pl-3 text-ocistok">Login</button>
                <button className="rounded-2xl bg-white py-1 pr-3 pl-3 text-ocistok">Register</button>
              </div>
          </div>
      </header>
      <div className="container mx-auto p-8">
          <div className="grid grid-cols-5 gap-5">
            { 
            productAll && productAll.map((product,i) => (
                <div key={i} className="bg-white shadow rounded-xl overflow-hidden border-2">
                  <div className="relative pt-4">
                    <div className="text-center pl-6 pr-6">
                        <Image
                          src={product.image}
                          alt="Picture of the author"
                          width={750}
                          height={620}
                          layout="responsive"
                          className="rounded-lg w-full"
                        />
                    </div>
                  </div>
                  <div className="pb-2 px-2">
                      <h4 className="uppercase text-center font-normal text-xl mb-2 text-gray-800 hover:text-ocistok transition">{product.productName}</h4>
                      <button onClick={handleRemove.bind(this,product.id_product)} className="block pb-3 w-full py-1 text-center text-white bg-ocistok border border-yellow-300 rounded-md hover:bg-transparent hover:text-ocistok transition">Hapus</button>
                  </div>
                </div>
            ))}

          </div>
      </div>
      <footer className="h-20 shadow-sm bg-ocistok text-white text-center py-6">
          <h4 className="font-normal">Copyright @ PT Occumerco Capital Indonesia</h4>
      </footer>
    </div>
    </>
  )
}