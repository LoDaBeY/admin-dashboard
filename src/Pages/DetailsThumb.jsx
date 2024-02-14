
function DetailsThumb({myRef,ImageLink, tab}) {
  return (
    <div className="thumb" ref={myRef}>
        {
        ImageLink.map((img, index) =>(
            <img src={img} alt="" key={index} 
            onClick={() => tab(index)}
            />
        ))
        }
    </div>  )
}

export default DetailsThumb