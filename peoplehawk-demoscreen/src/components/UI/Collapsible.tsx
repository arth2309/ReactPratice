import React, { useState } from "react";
import './Collapsible.css';
// import  dropdown from '../../assests/img/arrow-dropdown.svg'
import  {ReactComponent as Dropdown} from '../../assests/img/arrow-dropdown.svg'

interface IProps {
  open?: boolean;
  title: string;
  children: React.ReactNode; 
}

const Collapsible: React.FC<IProps> = ({ open = false, children, title }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (

    <div className="card">
      <div>
        <div className="content">
          <h3><strong style={{color : '#42455C'}}>{title}</strong></h3>
          <button type="button" className="btn" onClick={handleFilterOpening}>
            
            <Dropdown  height='20px' style={{rotate : isOpen ? '180deg' : '0deg' }} />
            {/* <img src={require('../../assests/img/arrow-dropdown.svg')}  /> */}
            
          </button>
        </div>
      </div>

      <div>
        {isOpen && <div className="collapsible">{children}</div>}
      </div>
    </div>

  );
};

export default Collapsible;
