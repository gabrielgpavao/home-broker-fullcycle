package entity

type OrderQueue struct {
	Orders []*Order
}

func (oq *OrderQueue) Less(i int, j int) bool {
	return oq.Orders[i].Price < oq.Orders[j].Price
}

func (oq *OrderQueue) Swap(i int, j int) {
	oq.Orders[i], oq.Orders[j] = oq.Orders[j], oq.Orders[i]
}

func (oq *OrderQueue) Len() int {
	return len(oq.Orders)
}

func (oq *OrderQueue) Push(x interface{}) {
	oq.Orders = append(oq.Orders, x.(*Order))
}

func (oq *OrderQueue) Pop() interface{} {
	oldOrders := oq.Orders
	ordersLength := len(oldOrders)
	orderPoped := oldOrders[ordersLength - 1]
	oq.Orders = oldOrders[0 : ordersLength - 1]

	return orderPoped
}

func NewOrderQueue() *OrderQueue {
	return &OrderQueue{}
}
