package entity

type TOrderType string

const (
	Buy  TOrderType = "buy"
	Sell TOrderType = "sell"
)

type Order struct {
	ID string
	Investor *Investor
	Asset *Asset
	Shares int
	PendingShares int
	Price float64
	OrderType TOrderType
	Status string
	Transactions []*Transaction
}

func NewOrder(orderID string, investor *Investor, asset *Asset, shares int, price float64, orderType TOrderType) *Order {
	return &Order{
		ID: orderID,
		Investor: investor,
		Asset: asset,
		Shares: shares,
		PendingShares: shares,
		Price: price,
		OrderType: TOrderType(orderType),
		Status: "OPEN",
		Transactions: []*Transaction{},
	}
}
