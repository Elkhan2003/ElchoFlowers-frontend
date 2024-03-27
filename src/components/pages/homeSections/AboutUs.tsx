import { FC } from "react";
import scss from "./AboutUs.module.scss";
import {
  IconBasket,
  IconBasketOff,
  IconHeart,
  IconHeartOff,
} from "@tabler/icons-react";
import {
  // useDeleteProductMutation,
  useGetProductsQuery,
} from "@/src/redux/api/product";
import { Button, Skeleton } from "antd";
import { useAddProductBasketMutation } from "@/src/redux/api/basket";
import { useAddProductFavoriteMutation } from "@/src/redux/api/favorite";

const AboutUs: FC = () => {
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [addProductBasketMutation] = useAddProductBasketMutation();
  const [addProductFavoriteMutation] = useAddProductFavoriteMutation();
  // const [deleteProductMutation] = useDeleteProductMutation();

  const addProductBasket = async (id: number) => {
    await addProductBasketMutation(id);
    await refetch();
  };

  const addProductFavorite = async (id: number) => {
    await addProductFavoriteMutation(id);
    await refetch();
  };

  function isURL(str: string): boolean {
    const urlPattern = /^(https?|ftp|http?):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(str);
  }

  return (
    <>
      <section className={scss.AboutUs}>
        <div className="container">
          <div className={scss.content}>
            <h1 className={scss.title}>
              What is <span>ElchoFlowers</span>
            </h1>
            <div className={scss.products}>
              {isLoading ? (
                <>
                  <h1>Loading...</h1>
                </>
              ) : (
                <>
                  {data?.results.map((item) => (
                    <div key={item.id} className={scss.product}>
                      {isURL(item.photo) ? (
                        <img
                          className={scss.product_img}
                          src={item.photo}
                          alt={item.title}
                        />
                      ) : (
                        <Skeleton.Image
                          className={scss.product_img}
                          active={true}
                        />
                      )}
                      <div className={scss.product_info}>
                        <div>
                          <h1>{item.title}</h1>
                          <p>В наличии: {item.quantity}</p>
                          <p>Цена: {item.price}</p>
                        </div>
                        <div className={scss.buttons}>
                          <Button
                            onClick={() => addProductBasket(item.id)}
                            type="primary"
                            shape="circle"
                          >
                            {item.isBasket ? <IconBasketOff /> : <IconBasket />}
                          </Button>
                          <Button
                            onClick={() => addProductFavorite(item.id)}
                            type="primary"
                            shape="circle"
                          >
                            {item.isFavorite ? <IconHeartOff /> : <IconHeart />}
                          </Button>
                        </div>
                      </div>
                      <div className={scss.vendor}>
                        <img
                          className={scss.vendor_img}
                          src={item.vendor.photo}
                          alt={item.vendor.name}
                        />
                        <div className={scss.info}>
                          <p>Автор: {item.vendor.name}</p>
                          <p>Контакт: {item.vendor.login}</p>
                        </div>
                      </div>
                      {/* <Button onClick={() => deleteProductMutation(item.id)}>
												useDeleteProductMutation
											</Button> */}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutUs;
