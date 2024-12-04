daltonismoSelect.addEventListener('change', function() {
    console.log("Evento disparado");
    console.log("Valor selecionado:", daltonismoSelect.value);
    
    // Remover as classes anteriores de daltonismo
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    
    // Captura o valor selecionado
    const selectedValue = daltonismoSelect.value;

    // Se um valor for selecionado, adiciona a classe correspondente
    if (selectedValue) {
        document.body.classList.add(selectedValue);  // Adiciona a classe ao body
    }
});
