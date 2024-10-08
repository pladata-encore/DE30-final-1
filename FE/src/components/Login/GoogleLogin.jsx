import { useRef } from 'react';
import useScript from '../../hooks/useScript';

export default function GoogleLogin({
  onGoogleSignIn = () => {},
  text = 'signin_with',
}) {
  const googleSignInButton = useRef(null);

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: (response) => {
        console.log('Google Login Response:', response);  // 로그 추가  --- 토큰정보 노출되므로 지워야함
        onGoogleSignIn(response);
      },
    });
    window.google.accounts.id.renderButton(
      googleSignInButton.current,
      { theme: 'filled_blue', size: 'large', text, width: '250' }
    );
  });
  return <div ref={googleSignInButton}></div>;
}