import toast from 'react-hot-toast';

export const toastifySuccessMessage=(mess)=>{
    toast.success(mess,{
        position:'bottom-center',
    });

}

export const toastifyErrorMessage=(mess)=>{
    toast.error(mess,{
        position:'bottom-center',
    });
}