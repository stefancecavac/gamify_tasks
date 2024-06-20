import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RewardToask = () => {
  const notify = () =>
    toast.dark('Custom toast with options', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div>
      <button onClick={notify}>Show Custom Toast</button>
    </div>
  );
};

export default RewardToask;
