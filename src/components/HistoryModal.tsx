import {Button, Modal} from '@mui/material';
import Equation from '../model/Equation';
import HistoryItem from './HistoryItem';

interface Props {
  modalOpen: boolean;
  onCloseModal: () => void;
  equation: Equation;
}

const HistoryModal = ({modalOpen, onCloseModal, equation}: Props) => {
  const getHistoryItems = () => {
    let current = equation;
    const items = [<HistoryItem equation={current} />];

    while (current.prevState !== null) {
      current = current.prevState;
      items.push(<HistoryItem equation={current} />);
    }

    return items;
  };

  return (
    <Modal open={modalOpen} disableAutoFocus={true}>
      <div className='history-modal'>
        <div className='content'>
          <h2>History</h2>
          {getHistoryItems()}
        </div>
        <div className='footer'>
          <Button variant='contained' onClick={onCloseModal}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HistoryModal;
