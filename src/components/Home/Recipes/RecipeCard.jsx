import timerIcon from "../../../assets/icons/Timer.svg";
import forkKnifeIcon from "../../../assets/icons/ForkKnife.svg";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import frAnimations, { motion } from "../../../constants/framerAnimations";
import formatTitle from "../../../utils/formatTitle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFav,
  getFavRecipes,
  removeFromFav,
} from "../../../reducers/recipesSlice";

function RecipeCard({ img, title, category, time, documentId }) {
  const [isFav, setIsFav] = useState(false);
  const { favRecipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (isFav) dispatch(removeFromFav(documentId));
    else dispatch(addToFav(documentId));
  };

  useEffect(() => {
    if (favRecipes) {
      const currentState = favRecipes.includes(documentId);
      setIsFav(currentState);
    }
  }, [favRecipes]);

  return (
    <motion.div
      {...frAnimations.fadeUp({ duration: 0.3, delay: 0.2 })}
      className="relative flex flex-col w-full h-[22rem] rounded-[1.8rem] bg-gradient-to-t from-babyBlue to-transparent pt-[2rem] pb-[1.5rem] px-6"
    >
      <div
        className="absolute top-12 right-10 bg-white rounded-full h-10 w-10 flex justify-center items-center cursor-pointer transition-all duration-300"
        style={{ transform: isFav ? "scale(0.9)" : "scale(1)" }}
        onClick={handleToggle}
      >
        <Heart
          fill={isFav ? "#FF6363" : "#DBE2E5"}
          stroke="none"
          className="transition-all duration-300"
          style={{ transform: isFav ? "scale(1.3)" : "scale(1)" }}
        />
      </div>

      <div className="h-[55%] overflow-hidden rounded-[1.6rem]">
        <img
          className="object-cover object-center w-full h-full"
          src={import.meta.env.VITE_API_SERVER + img}
          alt="food"
        />
      </div>
      <Link to={"/recipe/" + documentId}>
        <h1 className="text-2xl font-bold mt-4">{formatTitle(title, 33)}</h1>
      </Link>
      <div className="flex mt-auto items-center gap-4">
        <div className="rounded-full  flex items-center gap-1">
          <img src={timerIcon} alt="Timer" />
          <span className="text-sm text-black/60 font-medium">
            {time} Minutes
          </span>
        </div>
        <div className="rounded-full  flex items-center gap-1">
          <img src={forkKnifeIcon} alt="forkKnife" />
          <span className="text-sm text-black/60 font-medium">{category}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeCard;