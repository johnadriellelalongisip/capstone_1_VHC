import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const useDeviceId = () => {
  const [loading, setLoading] = useState(true);
  const [deviceId, setId] = useState(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setId(result.visitorId);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceId();
  }, []);

  return { loading, deviceId };
}

export default useDeviceId;