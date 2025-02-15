import TaskModal from 'components/TaskModal/TaskModal';
import { Icon, Button } from './AddTaskBtn.styled';
import { useState } from 'react';
import { selectDate } from 'redux/date/selectors';
import { useSelector } from 'react-redux';

export const AddTaskBtn = ({ category }) => {
  const defineCategory = category => {
    const categoryLowerCase = category.toLowerCase();
    const splitedCategory = categoryLowerCase.split(' ');
    category = splitedCategory.join('-');
    return category;
  };

  const [isTaskModalOpened, setIsTaskModalOpened] = useState(false);

  const handleToggle = () => setIsTaskModalOpened(prevState => !prevState);

  // Реалізація неактивної кнопки у випадку дня, що минув
  const date = useSelector(selectDate);

  const currentDate = new Date();
  // Встановлюємо час на початок дня
  currentDate.setHours(0, 0, 0, 0);
  const isButtonActive = new Date(date) >= currentDate;

  return (
    <>
      <Button onClick={handleToggle} disabled={!isButtonActive}>
        <Icon /> Add task
      </Button>
      {isTaskModalOpened && (
        <TaskModal
          handlerCloseModal={handleToggle}
          category={defineCategory(category)}
        ></TaskModal>
      )}
    </>
  );
};
