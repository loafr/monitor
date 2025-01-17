import React, { useState } from 'react';
import MonitorContainer from './MonitorContainer';
import defaultMonitor from '../context/setup/defaultsetup.json';
import ButtonArea from '../components/ButtonArea';

const Setup = () => {

  const [monitors, setMonitors] = useState([defaultMonitor]);
  const [scale, setScale] = useState(15);
  const [hideSizeOptions, setHideSizeOptions] = useState(false);
  const [hideBezelOptions, setHideBezelOptions] = useState(false);
  const [hideAspectRatioOptions, setHideAspectRatioOptions] = useState(false);
  const [hideResolutionOptions, setHideResolutionOptions] = useState(true);
  const [hideFeatureOptions, setHideFeatureOptions] = useState(true);
  const [hidePortOptions, setHidePortOptions] = useState(true);
  const [hideSellerInfoOptions, setHideSellerInfoOptions] = useState(true);

  const onAdd = () => {
    if (monitors.length < 9) {
      const monitorsUpdate = [...monitors];
      let newMonitor = JSON.parse(JSON.stringify(defaultMonitor));
      newMonitor.index = monitors.length;
      monitorsUpdate.push(newMonitor);
      setMonitors(monitorsUpdate);
    }
  }

  const onRemove = () => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate.pop();
    setMonitors(monitorsUpdate);
  }

  const onZoomIn = () => {
    setScale(scale + 1);
  }

  const onZoomOut = () => {
    setScale(scale - 1);
  }

  const onDiagonalChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].diagonal = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onBezelWidthChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].bezelWidth = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onBezelColorChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].bezelColor = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onOrientationChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].orientation = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onAspectRatioChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].aspectRatio = e.target.value;
    const [horRes, verRes] = calcResolution(monitorsUpdate[index].resolution.type, monitorsUpdate[index].aspectRatio);
    monitorsUpdate[index].resolution.horRes = horRes;
    monitorsUpdate[index].resolution.verRes = verRes;
    setMonitors(monitorsUpdate);
  }

  const onResolutionChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].resolution.type = e.target.value;
    const [horRes, verRes] = calcResolution(monitorsUpdate[index].resolution.type, monitorsUpdate[index].aspectRatio);
    monitorsUpdate[index].resolution.horRes = horRes;
    monitorsUpdate[index].resolution.verRes = verRes;
    setMonitors(monitorsUpdate);
  }

  const onHorResChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].resolution.horRes = e.target.value;
    monitorsUpdate[index].aspectRatio = calcAspectRatio(monitorsUpdate[index].resolution.horRes, monitorsUpdate[index].resolution.verRes);
    setMonitors(monitorsUpdate);
  }

  const onVerResChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].resolution.verRes = e.target.value;
    monitorsUpdate[index].aspectRatio = calcAspectRatio(monitorsUpdate[index].resolution.horRes, monitorsUpdate[index].resolution.verRes);
    setMonitors(monitorsUpdate);
  }

  const onDisplayTypeChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].displayType = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onSyncTypeChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].syncType = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onRefreshRateChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].refreshRate = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onResponseTimeChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].responseTime = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onHdrChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].features.hdr = !monitorsUpdate[index].features.hdr;
    setMonitors(monitorsUpdate);
  }

  const onSrgbChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].features.srgb = !monitorsUpdate[index].features.srgb;
    setMonitors(monitorsUpdate);
  }

  const onCurvedChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].features.curved = !monitorsUpdate[index].features.curved;
    setMonitors(monitorsUpdate);
  }

  const onWebcamChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].features.webcam = !monitorsUpdate[index].features.webcam;
    setMonitors(monitorsUpdate);
  }

  const onTouchChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].features.touch = !monitorsUpdate[index].features.touch;
    setMonitors(monitorsUpdate);
  }

  const onSpeakersChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].features.speakers = !monitorsUpdate[index].features.speakers ;
    setMonitors(monitorsUpdate);
  }

  const onHdmiChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].ports.hdmi = !monitorsUpdate[index].ports.hdmi;
    setMonitors(monitorsUpdate);
  }

  const onDisplayPortChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].ports.displayPort = !monitorsUpdate[index].ports.displayPort;
    setMonitors(monitorsUpdate);
  }

  const onUsbcChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].ports.usbc = !monitorsUpdate[index].ports.usbc;
    setMonitors(monitorsUpdate);
  }

  const onVgaChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].ports.vga = !monitorsUpdate[index].ports.vga;
    setMonitors(monitorsUpdate);
  }

  const onDviChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].ports.dvi = !monitorsUpdate[index].ports.dvi;
    setMonitors(monitorsUpdate);
  }

  const onBrandChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].sellerInfo.brand = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onPriceChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].sellerInfo.price = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onLinkChange = (index, e) => {
    const monitorsUpdate = [...monitors];
    monitorsUpdate[index].sellerInfo.link = e.target.value;
    setMonitors(monitorsUpdate);
  }

  const onToggleSizeOptions = (e) => {
    setHideSizeOptions(!hideSizeOptions);
  };

  const onToggleBezelOptions = (e) => {
    setHideBezelOptions(!hideBezelOptions);
  };

  const onToggleAspectRatioOptions = (e) => {
    setHideAspectRatioOptions(!hideAspectRatioOptions);
  };

  const onToggleResolutionOptions = (e) => {
    setHideResolutionOptions(!hideResolutionOptions);
  };

  const onToggleFeatureOptions = (e) => {
    setHideFeatureOptions(!hideFeatureOptions);
  };

  const onTogglePortOptions = (e) => {
    setHidePortOptions(!hidePortOptions);
  };

  const onToggleSellerInfoOptions = (e) => {
    setHideSellerInfoOptions(!hideSellerInfoOptions);
  };


  const calcAspectRatio = (horRes, verRes) => {
    const theta = Math.atan(verRes / horRes);
    if (theta > 0.784 && theta < 0.787) return "1:1";
    else if ((theta > 0.673 && theta < 0.676) || (theta > 0.894 && theta < 0.898)) return "5:4";
    else if ((theta > 0.642 && theta < 0.645) || (theta > 0.925 && theta < 0.929)) return "4:3";
    else if ((theta > 0.587 && theta < 0.590) || (theta > 0.980 && theta < 0.984)) return "3:2";
    else if ((theta > 0.557 && theta < 0.560) || (theta > 1.010 && theta < 1.014)) return "16:10";
    else if ((theta > 0.538 && theta < 0.542) || (theta > 1.028 && theta < 1.032)) return "5:3";
    else if ((theta > 0.511 && theta < 0.514) || (theta > 1.056 && theta < 1.056)) return "16:9";
    else if ((theta > 0.462 && theta < 0.465) || (theta > 1.105 && theta < 1.109)) return "2:1";
    else if ((theta > 0.398 && theta < 0.406) || (theta > 1.164 && theta < 1.173)) return "21:9";
    else if ((theta > 0.300 && theta < 0.304) || (theta > 1.265 && theta < 1.270)) return "32:10";
    else if ((theta > 0.273 && theta < 0.276) || (theta > 1.295 && theta < 1.301)) return "32:9";
    else return "custom";
  }

  const calcResolution = (resolutionType, aspectRatio) => {
    let horRes, verRes;
    if (aspectRatio === "32:9") {
      if (resolutionType === "VGA") {
        horRes = 2160;
        verRes = 600;
      } else if (resolutionType === "HD") {
        horRes = 2560;
        verRes = 768;
      } else if (resolutionType === "HD+") {
        horRes = 3440;
        verRes = 900;
      } else if (resolutionType === "FHD") {
        horRes = 3840;
        verRes = 1080;
      } else if (resolutionType === "FHD+") {
        horRes = 4320;
        verRes = 1200;
      } else if (resolutionType === "QHD") {
        horRes = 5120;
        verRes = 1440;
      } else if (resolutionType === "QHD+") {
        horRes = 5690;
        verRes = 1600;
      } else if (resolutionType === "4K") {
        horRes = 7860;
        verRes = 2160;
      } else if (resolutionType === "5K") {
        horRes = 10240;
        verRes = 2880;
      } else if (resolutionType === "8K") {
        horRes = 15720;
        verRes = 4320;
      }
    }
    //if a 21:9 aspect ratio
    else if (aspectRatio === "21:9") {
      if (resolutionType === "VGA") {
        horRes = 1420;
        verRes = 600;
      } else if (resolutionType === "HD") {
        horRes = 1820;
        verRes = 768;
      } else if (resolutionType === "HD+") {
        horRes = 2130;
        verRes = 900;
      } else if (resolutionType === "FHD") {
        horRes = 2560;
        verRes = 1080;
      } else if (resolutionType === "FHD+") {
        horRes = 2560;
        verRes = 1080;
      } else if (resolutionType === "QHD") {
        horRes = 3440;
        verRes = 1440;
      } else if (resolutionType === "QHD+") {
        horRes = 3840;
        verRes = 1600;
      } else if (resolutionType === "4K") {
        horRes = 5120;
        verRes = 2160;
      } else if (resolutionType === "5K") {
        horRes = 6720;
        verRes = 2880;
      } else if (resolutionType === "8K") {
        horRes = 10240;
        verRes = 4320;
      }
    } else if (aspectRatio === "16:9") {
      if (resolutionType === "VGA") {
        horRes = 1024;
        verRes = 600;
      } else if (resolutionType === "HD") {
        horRes = 1366;
        verRes = 768;
      } else if (resolutionType === "HD+") {
        horRes = 1600;
        verRes = 900;
      } else if (resolutionType === "FHD") {
        horRes = 1920;
        verRes = 1080;
      } else if (resolutionType === "FHD+") {
        horRes = 2130;
        verRes = 1200;
      } else if (resolutionType === "QHD") {
        horRes = 2560;
        verRes = 1440;
      } else if (resolutionType === "QHD+") {
        horRes = 2844;
        verRes = 1600;
      } else if (resolutionType === "4K") {
        horRes = 3840;
        verRes = 2160;
      } else if (resolutionType === "5K") {
        horRes = 5120;
        verRes = 2880;
      } else if (resolutionType === "8K") {
        horRes = 7860;
        verRes = 4320;
      }
    } else if (aspectRatio === "16:10") {
      if (resolutionType === "VGA") {
        horRes = 1024;
        verRes = 640;
      } else if (resolutionType === "HD") {
        horRes = 1230;
        verRes = 768;
      } else if (resolutionType === "HD+") {
        horRes = 1440;
        verRes = 900;
      } else if (resolutionType === "FHD") {
        horRes = 1680;
        verRes = 1050;
      } else if (resolutionType === "FHD+") {
        horRes = 1920;
        verRes = 1200;
      } else if (resolutionType === "QHD") {
        horRes = 2304;
        verRes = 1440;
      } else if (resolutionType === "QHD+") {
        horRes = 2560;
        verRes = 1600;
      } else if (resolutionType === "4K") {
        horRes = 3840;
        verRes = 2400;
      } else if (resolutionType === "5K") {
        horRes = 5120;
        verRes = 3200;
      } else if (resolutionType === "8K") {
        horRes = 7680;
        verRes = 4800;
      }
    } else if (aspectRatio === "4:3") {
      if (resolutionType === "VGA") {
        horRes = 800;
        verRes = 600;
      } else if (resolutionType === "HD") {
        horRes = 1024;
        verRes = 768;
      } else if (resolutionType === "HD+") {
        horRes = 1280;
        verRes = 960;
      } else if (resolutionType === "FHD") {
        horRes = 1440;
        verRes = 1080;
      } else if (resolutionType === "FHD+") {
        horRes = 1600;
        verRes = 1200;
      } else if (resolutionType === "QHD") {
        horRes = 1920;
        verRes = 1440;
      } else if (resolutionType === "QHD+") {
        horRes = 2133;
        verRes = 1600;
      } else if (resolutionType === "4K") {
        horRes = 2800;
        verRes = 2100;
      } else if (resolutionType === "5K") {
        horRes = 4096;
        verRes = 3072;
      } else if (resolutionType === "8K") {
        horRes = 6400;
        verRes = 4800;
      }
    } else if (aspectRatio === "5:4") {
      if (resolutionType === "VGA") {
        horRes = 750;
        verRes = 600;
      } else if (resolutionType === "HD") {
        horRes = 960;
        verRes = 768;
      } else if (resolutionType === "HD+") {
        horRes = 1280;
        verRes = 1024;
      } else if (resolutionType === "FHD") {
        horRes = 1280;
        verRes = 1024;
      } else if (resolutionType === "FHD+") {
        horRes = 1600;
        verRes = 1280;
      } else if (resolutionType === "QHD") {
        horRes = 1800;
        verRes = 1440;
      } else if (resolutionType === "QHD+") {
        horRes = 2000;
        verRes = 1600;
      } else if (resolutionType === "4K") {
        horRes = 2560;
        verRes = 2048;
      } else if (resolutionType === "5K") {
        horRes = 3600;
        verRes = 2880;
      } else if (resolutionType === "8K") {
        horRes = 5120;
        verRes = 4096;
      }
    }
    return [horRes, verRes];
  }

  return (
    <>
      <ButtonArea
        onAdd={onAdd}
        onRemove={onRemove}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        numMonitors={monitors.length}
      />
      <section className="setupContainer">
        {
          monitors.map(monitor =>
            <MonitorContainer
              key={monitor.index}
              monitor={monitor}
              scale={scale}
              hideSizeOptions={hideSizeOptions}
              hideBezelOptions={hideBezelOptions}
              hideAspectRatioOptions={hideAspectRatioOptions}
              hideResolutionOptions={hideResolutionOptions}
              hideFeatureOptions={hideFeatureOptions}
              hidePortOptions={hidePortOptions}
              hideSellerInfoOptions={hideSellerInfoOptions}
              onDiagonalChange={onDiagonalChange}
              onBezelWidthChange={onBezelWidthChange}
              onBezelColorChange={onBezelColorChange}
              onOrientationChange={onOrientationChange}
              onAspectRatioChange={onAspectRatioChange}
              onResolutionChange={onResolutionChange}
              onHorResChange={onHorResChange}
              onVerResChange={onVerResChange}
              onDisplayTypeChange={onDisplayTypeChange}
              onSyncTypeChange={onSyncTypeChange}
              onRefreshRateChange={onRefreshRateChange}
              onResponseTimeChange={onResponseTimeChange}
              onHdrChange={onHdrChange}
              onSrgbChange={onSrgbChange}
              onCurvedChange={onCurvedChange}
              onWebcamChange={onWebcamChange}
              onTouchChange={onTouchChange}
              onSpeakersChange={onSpeakersChange}
              onHdmiChange={onHdmiChange}
              onDisplayPortChange={onDisplayPortChange}
              onUsbcChange={onUsbcChange}
              onVgaChange={onVgaChange}
              onDviChange={onDviChange}
              onBrandChange={onBrandChange}
              onPriceChange={onPriceChange}
              onLinkChange={onLinkChange}
              onToggleSizeOptions={onToggleSizeOptions}
              onToggleBezelOptions={onToggleBezelOptions}
              onToggleAspectRatioOptions={onToggleAspectRatioOptions}
              onToggleResolutionOptions={onToggleResolutionOptions}
              onToggleFeatureOptions={onToggleFeatureOptions}
              onTogglePortOptions={onTogglePortOptions}
              onToggleSellerInfoOptions={onToggleSellerInfoOptions}
            />
          )
        }
      </section>
    </>
  );
};

export default Setup;
