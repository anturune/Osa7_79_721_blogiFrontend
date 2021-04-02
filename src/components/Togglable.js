import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
//Komponentin luova funktio on kääritty funktiokutsun forwardRef sisälle, 
//näin komponentti pääsee käsiksi sille määriteltyyn refiin, tässä halutaan
//päästä blogFormRef:iin joka tulee tänne App.js filestä
const Togglable = React.forwardRef((props, ref) => {
    //console.log('TOGGLABLE', props, ref)
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    //Komponentti tarjoaa useImperativeHandle -hookin avulla sisäisesti 
    //määritellyn funktionsa toggleVisibility ulkopuolelta kutsuttavaksi
    //useImperativeHandle on siis React hook, jonka avulla funktiona määritellylle 
    //komponentille voidaan määrittää funktioita, joita on mahdollista kutsua sen ulkopuolelta.
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    //Tällä määrätään, että alla "return koodissa olevissa "props":eissa on String tyyppinen arvo
    //eli buttoneilla on label
    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }
    //Tällä saadaan komponentille nimi, muutoin linttaus ".eslintrc.js" antaa paljon virheitä
    Togglable.displayName = 'Togglable'
    //Cancel button ja new blog buttonit, "new blog" buttonin labeliin otetaan
    //propseina "App.js filestä" "blogForm" käsittelijästä
    // props.children, jonka avulla koodi viittaa komponentin lapsiin, eli avaavan ja 
    //sulkevan tagin sisällä määriteltyihin React-elementteihin
    return (
        <div>
            <div style={hideWhenVisible}>
                < Button onClick={toggleVisibility}>{props.buttonLabel}</ Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                < Button onClick={toggleVisibility}>{props.hideLabel}</ Button>
            </div>
        </div>
    )
})

export default Togglable