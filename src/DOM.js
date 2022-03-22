import { doc } from 'prettier';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const tags = document.createElement(tag);
        tags.innerHTML = content;
        document.body.append(tags);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    let div = document.createElement('div');
    div.classList.add('item_' + 1);

    function tree(div, count, n, level) {
        for (let i = 0; i < count; i++) {
            let div2 = document.createElement('div');
            div2.classList.add('item_' + n);
            if (n != level) {
                div.appendChild(tree(div2, count, n + 1, level));
            } else {
                div.appendChild(div2);
            }
        }
        return div;
    }

    return tree(div, childrenCount, 2, level);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const n = 'item_2';
    const tree = generateTree(2, 3);
    const second = tree.querySelectorAll(`.${n}`);
    for (let item of second) {
        const section = document.createElement('section');
        section.classList.add(n);
        section.innerHTML = item.innerHTML;
        item.before(section);
        item.remove();
    }
    return tree;
}
