import "./Memberinterestanalysis.css";

const Hotspot = (props : any) => {

    const {onCardHandler} = props
    return(
        
        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2717.09 2717.09" className="chart-slice"  >
  
  <g id="Shapes">
    <g>
      <path className="cls-1" d="M1358.55,1358.55l1172.21,676.77c-118.79,205.75-289.68,376.64-495.43,495.43-205.75,118.79-439.19,181.34-676.77,181.34v-1353.55Z"  onClick={() => onCardHandler('REALISTIC')}  />
      <path className="cls-1" d="M1358.55,1358.55l1172.21-676.77c118.79,205.75,181.34,439.19,181.34,676.77s-62.55,471.02-181.34,676.77l-1172.21-676.77Z"   onClick={() => onCardHandler('INVESTIGATIVE')}/>
      <path className="cls-1" d="M1358.55,1358.55V5c237.58,0,471.02,62.55,676.77,181.34,205.75,118.79,376.64,289.68,495.43,495.43l-1172.21,676.77Z" onClick={() =>  onCardHandler('ARTISTIC')} />
      <path className="cls-1" d="M1358.55,1358.55L186.34,681.77c118.79-205.75,289.68-376.64,495.43-495.43C887.52,67.55,1120.97,5,1358.55,5v1353.55Z"  onClick={() =>  onCardHandler('SOCIAL')} />
      <path className="cls-1" d="M1358.55,1358.55L186.34,2035.32C67.55,1829.57,5,1596.13,5,1358.55s62.55-471.02,181.34-676.77l1172.21,676.77Z"  onClick={() =>  onCardHandler('ENTERPRISING')}/>
      <path className="cls-1" d="M1358.55,1358.55v1353.55c-237.58,0-471.02-62.55-676.77-181.34-205.75-118.79-376.64-289.68-495.43-495.43l1172.21-676.77Z"  onClick={() =>  onCardHandler('CONVENTIONAL')}/>
      <line className="cls-1" x1="185.5" y1="2035.81" x2="2531.6" y2="681.29"/>
      <line className="cls-1" x1="1358.55" y1="2712.14" x2="1358.55" y2="4.95"/>
      <line className="cls-1" x1="2530.09" y1="2034.94" x2="187" y2="682.15"/>
    </g>
  </g> 
</svg>


    );

}


export default Hotspot