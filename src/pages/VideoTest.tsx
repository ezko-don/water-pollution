import ReactPlayer from 'react-player';

const VideoTest = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Video Test</h1>
            <ReactPlayer
                url="https://www.youtube.com/watch?v=7W33HRc1A6c"
                width="640px"
                height="360px"
                controls
            />
        </div>
    );
};

export default VideoTest;
