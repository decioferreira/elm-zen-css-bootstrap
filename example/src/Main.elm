module Main exposing (main)

import CSS.Attributes
import CSS.Bootstrap as Bootstrap
import Html exposing (Html)
import Html.Attributes as Attributes


main : Html msg
main =
    Html.div []
        [ Html.h1 []
            [ Html.text "Hello world!" ]
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnPrimary, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Primary" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnSecondary, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Secondary" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnSuccess, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Success" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnDanger, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Danger" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnWarning, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Warning" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnInfo, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Info" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnLight, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Light" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnDark, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Dark" ]
        , Html.text " "
        , Html.button
            [ CSS.Attributes.classList [ ( Bootstrap.btn, True ), ( Bootstrap.btnLink, True ) ]
            , Attributes.type_ "button"
            ]
            [ Html.text "Link" ]
        ]
