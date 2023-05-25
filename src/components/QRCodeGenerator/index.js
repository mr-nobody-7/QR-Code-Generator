import { Component } from 'react'

import QRCode from 'qrcode.react'

import './index.css'

class QRCodeGenerator extends Component {
    state = {
        qrValue : "",
        showQr : false
    }

    onChangeInput = event => {
        this.setState({qrValue : event.target.value, showQr:false})
    }

    generateQrCode = () => {
        this.setState({showQr : true})
    }

    onDownload = () => {
        const canvas = document.getElementById('qrCanvas') // Get the QR code canvas element
        const pngUrl = canvas.toDataURL('image/png') // Convert the canvas to a PNG image data URL

        const downloadLink = document.createElement('a') // Create a download link element
        downloadLink.href = pngUrl // Set the href attribute to the PNG data URL
        downloadLink.download = 'qrcode.png' // Set the download attribute with the desired file name

        document.body.appendChild(downloadLink) // Append the link to the document body
        downloadLink.click() // Programmatically trigger the click event
        document.body.removeChild(downloadLink) // Remove the link from the document body
    }

    renderQrCode = () => {
        const{qrValue} = this.state
        if(qrValue.length!==0) {
            return(
                <div className='qr-code-container'>
                    <QRCode id='qrCanvas' value={qrValue} level='H' size='250' includeMargin="true" />
                    <button className='button' onClick={this.onDownload}>Download</button>
                </div>
                
            )
        }        
    }

    clear = () => {
        this.setState({qrValue : "", showQr: false})
    }

    render() {
        const {showQr, qrValue} = this.state

        return (
            <div className='app-container'>
                <div className='heading-container'>
                    <h1 className='heading'>QR CODE GENERATOR</h1>
                </div>
                <div className='main-container'>
                    <label className='input-label' htmlFor='url'>ENTER THE TEXT</label>
                    <input className='input-element' id="url" type="text" onChange={this.onChangeInput} value={qrValue}/>
                    <div className='buttons-container'>
                        <button type="button" className='button' onClick={this.generateQrCode}>Generate QR Code</button>
                        <button type="button" className='button' onClick={this.clear}>Clear</button>
                    </div>
                    
                    {showQr ? 
                        this.renderQrCode()
                    :
                    null
                    }
                </div>
                
            </div>
        )
    }
}

export default QRCodeGenerator