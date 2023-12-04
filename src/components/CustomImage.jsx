export default function CustomImage({imgSrc, pt}){
    return(
        <div className="custum-img" style={{paddingTop: pt}}>

           <img src={imgSrc} alt="" />

        </div>
    )
  
}