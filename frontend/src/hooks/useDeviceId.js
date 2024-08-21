import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const useDeviceId = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        sessionStorage.setItem("myDeviceId", result.visitorId)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceId();
  }, []);

  return { loading };
}

export default useDeviceId;