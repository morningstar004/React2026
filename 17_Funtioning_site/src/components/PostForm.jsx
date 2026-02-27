import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select, RTE} from '../components/index';
import {service as appwriteServise} from '../appWrite/service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostForm = ({post}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.$id || '',
            featuredImg: post?.featuredImg || '',
            status: post?.status || 'active',
        },    
    });
    const userData = useSelector(state => state.user.userData)

    const submit = async (data) => {
        if(post){
            const file = await data.image[0] ? appwriteServise.updatePost(post.$id, {...data, useID: userData.$id}) : null 
            if(file){
                appwriteServise.deleteFile(post.featuredImg)
            }
        } else {
            await appwriteServise.createPost({...data, useID: userData.$id})
        }
        navigate('/')
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }
    },[])

    React.useEffect(() => {
        register('slug', { required: true, validate: value => slugTransform(value) === value || 'Slug must be in lowercase and can only contain letters, numbers, and hyphens.' });
    }, [register, slugTransform , setValue , watch]);

  return (
    <div>
      PostForm
    </div>
  )
}

export default PostForm
