import React, { useState } from "react";
import './Accordion.css';
// import  dropdown from '../../assests/img/arrow-dropdown.svg'
import  {ReactComponent as Dropdown} from '../../../assests/img/arrow-dropdown.svg'

interface IProps {
  open?: boolean;
  title: string;
  children: React.ReactNode; 
}

const Accordion: React.FC<IProps> = ({ open = false, children, title }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (

    <div className="card">
      <div>
        <div className="content"  onClick={handleFilterOpening}>
          {window.innerWidth > 576 ?<h3 style={{marginBottom : '2px'}}><strong style={{color : '#42455C'}}>{title}</strong></h3>:<h4 style={{marginBottom : '2px'}}><strong style={{color : '#42455C'}}>{title}</strong></h4> }
          
          <button type="button" className="btn">
            
            <Dropdown  height='12px' style={{rotate : isOpen ? '180deg' : '0deg' }} />
           
            
          </button>
        </div>
      </div>

      <div>
        {isOpen && <div className="collapsible">{children}</div>}
      </div>
    </div>

  );
};

export default Accordion;
