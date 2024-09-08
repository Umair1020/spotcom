import React, { useRef, useCallback } from 'react';


const Demo1 = () => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);

  const handleMouseEnter = useCallback((videoRef) => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Error playing video:', error);
        });
      }
    }
  }, []);

  const handleMouseLeave = useCallback((videoRef) => {
    const video = videoRef.current;
    if (video) {
      const pausePromise = video.pause();
      if (pausePromise !== undefined) {
        pausePromise.catch((error) => {
          console.error('Error pausing video:', error);
        });
      }
    }
  }, []);

  return (
    <div>
      <div className="white img-position-image-left-image-top">
        <div className="layoutcontainer">
          <div className="withoutmargin">
            <div className="spacing">
              <div className="aem-Grid aem-Grid--12 aem-Grid--default--12">
               
                <div className="homepagetwocolumn aem-GridColumn aem-GridColumn--default--12">
                <section id="col2layoutRow2">
                    <div className="col_2_layout true">
                      <div
                        className="col_2 animatecol_2 light playonhoverloop playonhover animate"
                        style={{ height: '699px' }}
                        onMouseEnter={() => handleMouseEnter(videoRef3)}
                        onMouseLeave={() => handleMouseLeave(videoRef3)}
                      >
                        <div className="bg" style={{ backgroundImage: `url("/1.png")` }}>
                          <video
                            ref={videoRef3}
                            muted
                            preload="auto"
                            poster="/1.png"
                            loop
                          >
                            <source src="/2.mp4" type="video/mp4" />
                          </video>
                        </div>
                        <p className="title" style={{ color: '#fff', textAlign: 'center' }}>
                          The Future of Facility Infrastructure Management is Digital.
                        </p>
                        <p className="desc" style={{ color: '#fff', textAlign: 'center' }}>
                          Digital innovations like VR/XR, AI, and IoT are becoming essential for managing complex facilities.
                        </p>
                        <div className="buttonContainer" style={{ justifyContent: 'center' }} bis_skin_checked="1"><a href="/engineering/wipro-supports-marelli-for-the-development-of-its-cabin-digital-twin/" target="_blank" className="button" style={{ backgroundColor: '', color: '' }}>Learn More</a></div>
                      </div>
                      <div
                        className="col_2 animatecol_2 dark playonhoverloop playonhover bgLayerOn animate"
                        style={{ height: '699px' }}
                        onMouseEnter={() => handleMouseEnter(videoRef4)}
                        onMouseLeave={() => handleMouseLeave(videoRef4)}
                      >
                        <div className="bg" style={{ backgroundImage: `url("/3.png")` }}>
                          <video
                            ref={videoRef4}
                            muted
                            preload="auto"
                            poster="/3.png"
                            loop
                          >
                            <source src="/2.mp4" type="video/mp4" />
                          </video>
                        </div>
                        <p className="title" style={{ textAlign: 'center' }}>
                          Marelli Brings Vehicle Design to the Cloud.
                        </p>
                        <p className="desc" style={{ textAlign: 'center' }}>
                          Wipro’s Cloud Car framework is enabling Marelli to lead the way in software-defined vehicle features.
                        </p>
                        <div className="buttonContainer" style={{ justifyContent: 'center' }} bis_skin_checked="1"><a href="/engineering/wipro-supports-marelli-for-the-development-of-its-cabin-digital-twin/" target="_blank" className="button" style={{ backgroundColor: '', color: '' }}>Learn More</a></div>
                      </div>
                    </div>
                  </section>
                  <section id="col2layoutRow2">
                    <div className="col_2_layout true">
                      <div
                        className="col_2 animatecol_2 light playonhoverloop playonhover animate"
                        style={{ height: '699px' }}
                        onMouseEnter={() => handleMouseEnter(videoRef1)}
                        onMouseLeave={() => handleMouseLeave(videoRef1)}
                      >
                        <div className="bg" style={{ backgroundImage: `url("/1.png")` }}>
                          <video
                            ref={videoRef1}
                            muted
                            preload="auto"
                            poster="/1.png"
                            loop
                          >
                            <source src="/1.mp4" type="video/mp4" />
                          </video>
                        </div>
                        <p className="title" style={{ color: '#fff', textAlign: 'center' }}>
                          The Future of Facility Infrastructure Management is Digital.
                        </p>
                        <p className="desc" style={{ color: '#fff', textAlign: 'center' }}>
                          Digital innovations like VR/XR, AI, and IoT are becoming essential for managing complex facilities.
                        </p>
                        <div className="buttonContainer" style={{ justifyContent: 'center' }} bis_skin_checked="1"><a href="/engineering/wipro-supports-marelli-for-the-development-of-its-cabin-digital-twin/" target="_blank" className="button" style={{ backgroundColor: '', color: '' }}>Learn More</a></div>
                      </div>
                      <div
                        className="col_2 animatecol_2 dark playonhoverloop playonhover bgLayerOn animate"
                        style={{ height: '699px' }}
                        onMouseEnter={() => handleMouseEnter(videoRef2)}
                        onMouseLeave={() => handleMouseLeave(videoRef2)}
                      >
                        <div className="bg" style={{ backgroundImage: `url("/3.png")` }}>
                          <video
                            ref={videoRef2}
                            muted
                            preload="auto"
                            poster="/3.png"
                            loop
                          >
                            <source src="/123.mp4" type="video/mp4" />
                          </video>
                        </div>
                        <p className="title" style={{ textAlign: 'center' }}>
                          Marelli Brings Vehicle Design to the Cloud.
                        </p>
                        <p className="desc" style={{ textAlign: 'center' }}>
                          Wipro’s Cloud Car framework is enabling Marelli to lead the way in software-defined vehicle features.
                        </p>
                        <div className="buttonContainer" style={{ justifyContent: 'center' }} bis_skin_checked="1"><a href="/engineering/wipro-supports-marelli-for-the-development-of-its-cabin-digital-twin/" target="_blank" className="button" style={{ backgroundColor: '', color: '' }}>Learn More</a></div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo1;
