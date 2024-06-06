import runpy

# Ejecutar el script de scraping de SP Digital
print("Iniciando el scraping de SP Digital...")
runpy.run_path('spdigitalscrapp.py')
print("Scraping de SP Digital completado.")

# Una vez finalizado el scraping de SP Digital, iniciar el scraping de PC Factory
print("Iniciando el scraping de PC Factory...")
runpy.run_path('scrapping-pcfactory.py')
print("Scraping de PC Factory completado.")


#hice este codigo para manejar de manera apartada las logicas de las paginas de esta manera no tenemos un codigo ni cunfuso ni dificil de depurar 
#a este mismo tengo planeado darle mas paginas esta probado e introduce datos a mongo db de manera perfecta solo queda afinar pcfactory 