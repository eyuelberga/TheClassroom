import { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { UserMetaContext } from '../contexts';

export const useUserMetadata = () => {
  return useContext(UserMetaContext);
}
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};