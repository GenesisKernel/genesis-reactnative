#!/bin/bash

appcenter apps set-current str16071985/Apla

appcenter codepush release-react

appcenter apps set-current str16071985/Apla-Android

appcenter codepush release-react
