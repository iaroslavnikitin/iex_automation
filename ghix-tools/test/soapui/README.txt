To create the war file via command line

1. Go to your SoapUI installation directory
2. Find the path to the wargenerator.bat or wargenerator.sh file. It should be under the bin directory
3. Execute the wargenerator script with the following parameters

/opt/SmartBear/SoapUI-Pro/bin/wargenerator.sh -wtrue -xtrue -f${path_to_war_file} ${path_to_soapui_xml}

For example

/opt/SmartBear/SoapUI-Pro/bin/wargenerator.sh -wtrue -xtrue -fCA_AHBX_Mocks.war ~/CA_AHBX_Mocks-soapui-project.xml