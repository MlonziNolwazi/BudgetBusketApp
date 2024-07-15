import React from 'react'
import {Avatar , Image} from 'antd'
import { useTheme } from '@mui/material';
import { tokens } from "../../../theme";


export default function ChatBoxReciever({avatar="" , user="Unknown", message="loading...", role='customer'}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div  style={{display:'flex',  justifyContent:'flex-start' , flexDirection:'row'}} >
            <Avatar
            size={50}
            src={<Image
                src={avatar || '../../../assets/profile.png'}
                style={{
                    objectFit:'cover',
                    width:45,
                    height:45,
                    borderRadius: "100%"
                }}
                preview={false}
                />}
            />
            <p style={{padding:10 , backgroundColor:'rgb(172 216 138)', borderRadius: 10 , maxWidth: "60%" }} >
                <strong style={{fontSize:13}} >
                       {user} 
                </strong> <br></br>
                {message}
            </p>

    </div>
  )
}

export function ChatBoxSender({avatar="" , user="", message=""}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    return (
      <div  style={{display:'flex', paddingRight:10  ,justifyContent:'flex-end' , flexDirection:'row'}} >
              <Avatar
              size={50}
              src={<Image
                  src={avatar || '../../../assets/profile.png'}
                  style={{
                      objectFit:'cover',
                      width:45,
                      height:45,
                      borderRadius: "100%"
                  }}
                  preview={false}
                  />}
              />
              <p style={{padding:10 ,color: colors.secondary, backgroundColor: colors.blueAccent[400], borderRadius: 10 , maxWidth: "60%" }} >
                  <strong style={{fontSize:13}} >
                         {user} 
                  </strong> <br></br>
                  {message}
              </p>
  
      </div>
    )
  }