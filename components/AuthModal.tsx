'use client';

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from './Modal';

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title='Spotify-clone에 로그인하기'
      description='소셜 계정으로 로그인할 수 있습니다.'
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={['github','google','facebook']}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
        localization={{
          variables: {
            sign_up: {
              email_label: '사용자 이메일',
              password_label: '비밀번호',
              email_input_placeholder: '사용자 이메일',
              password_input_placeholder:	'비밀번호',
              button_label:	'가입하기',
              loading_button_label:	'로그인 중 ...',
              social_provider_text:	'{{provider}} 계정으로 로그인',
              link_text: '계정이 없습니까? 가입하기',
              confirmation_text: '이메일에서 인증 주소를 확인하세요.'
            },
            sign_in: {
              email_label: '사용자 이메일',
              password_label:	'비밀번호',
              email_input_placeholder: '사용자 이메일',
              password_input_placeholder:	'비밀번호',
              button_label:	'로그인하기',
              loading_button_label:	'로그인 중 ...',
              social_provider_text:	'{{provider}} 계정으로 로그인',
              link_text: '이미 계정이 있습니까? 로그인하기',
            },
            magic_link: {
              email_input_label: '사용자 이메일',
              email_input_placeholder: '사용자 이메일',
              button_label:	'로그인하기',
              loading_button_label:	'로그인 중 ...',
              link_text: '매직 링크로 로그인',
              confirmation_text: '이메일에서 매직 링크를 확인하세요.',
            },
            forgotten_password: {
              email_label: '사용자 이메일',
              password_label:	'비밀번호',
              email_input_placeholder: '사용자 이메일',
              button_label:	'비밀번호 재설정',
              loading_button_label:	'비밀번호 재설정 링크 발송 중...',
              link_text: '비밀번호를 잊었나요?',
              confirmation_text: '이메일에서 비밀번호 재설정 링크를 확인하세요.',
            },
            update_password: {
              password_label: '새로운 비밀번호',
              password_input_placeholder: '새로운 비밀번호',
              button_label: '비밀번호 변경',
              loading_button_label: '비밀번호 변경 중...',
              confirmation_text: '비밀번호 재설정 완료.',
            }
          },
        }}
        theme='dark'
      />
    </Modal>
  );
};

export default AuthModal;