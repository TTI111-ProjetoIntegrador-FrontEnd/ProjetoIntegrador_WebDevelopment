daltonismoSelect.addEventListener('change', function() {

    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    

    const selectedValue = daltonismoSelect.value;
    if (selectedValue) {
        document.body.classList.add(selectedValue);
    }
});
document.body.classList.add(selectedClass);