import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceId(result.visitorId);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceId();
  }, []);

  return { deviceId, loading, error };
}

export default useDeviceId;