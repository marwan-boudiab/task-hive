// import { useState } from 'react';
// import { useAuthContext } from './useAuthContext';

// type UseMutationParams = {
//   url: string;
//   method?: string;
// }

// type MutationState = {
//   isLoading: boolean;
//   error: string;
// }

// const useMutation = ({ url, method = 'POST' }: UseMutationParams) => {
//   const { user } = useAuthContext();
//   const [state, setState] = useState<MutationState>({
//     isLoading: false,
//     error: '',
//   });

//   const fn = async (data: FormData) => {
//     setState((prev) => ({
//       ...prev,
//       isLoading: true,
//     }));

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: data,
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       setState({ isLoading: false, error: '' });
//       // toast({
//       //   title: 'Successfully Added Image',
//       //   status: 'success',
//       //   duration: 2000,
//       //   position: 'top',
//       // });
//     } catch (error: any) {
//       setState({ isLoading: false, error: error.message });
//     }
//   };

//   return { mutate: fn, ...state };
// };

// export default useMutation;
