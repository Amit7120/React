import React from 'react'

const ImageHelper = ({product}) => {
	const imageurl = product ? product.image 
	: `https://images.pexels.com/photos/4538783/pexels-photo-4538783.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
	return(
		
		<div className="rounded border border-success p-2">
			<img src={imageurl}
			style={{maxHeight:"100%",maxWidth:"100%"}}
			className="mb-3 rounded"
			alt="" />
		</div>
		
		)
}

export default ImageHelper