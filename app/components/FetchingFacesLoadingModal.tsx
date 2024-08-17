import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
});

interface LoadingModalProps {
  open: boolean;
}

const FetchingFacesLoadingModal: React.FC<LoadingModalProps> = ({ open }) => {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] bg-white p-4 justify-center items-center text-emerald-500 flex flex-col"
        >
          <CircularProgress sx={{ color: "#10b981" }} />
          <h1 className={`${fredoka.className} mt-10 text-2xl md:text-[2vw]`}>Fetching More Faces, Please Wait...</h1>
        </div>
      </Modal>
    </div>
  );
};

export default FetchingFacesLoadingModal;
