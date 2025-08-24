import { ThreeCircles } from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                zIndex: 9999,
            }}
        >
           <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#494b48ff"
              ariaLabel="three-circles-loading"
            />
        </div>
    );
};

export default LoadingSpinner;